import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  imageSrc: string | null = null;
  results: { class: string; score: number }[] = [];
  isLoading: boolean = false; 

  constructor() {
    tf.ready().then(() => console.log('TensorFlow Ready'));
  }

  async captureImage() {
    try {
      const cameraAvailable = await this.isCameraAvailable();

      const photo = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        source: cameraAvailable ? CameraSource.Camera : CameraSource.Photos,
        resultType: CameraResultType.DataUrl,
      });

      this.imageSrc = photo.dataUrl || null;
    } catch (error) {
      console.error('Erreur :', error);
    }
  }

  private async isCameraAvailable(): Promise<boolean> {
    try {
      const status = await Camera.checkPermissions();
      if (!status.camera) {
        const permission = await Camera.requestPermissions();
        return permission.camera === 'granted';
      }
      return true;
    } catch (error) {
      console.error('Erreur :', error);
      return false;
    }
  }

  async analyzeImage() {
    if (!this.imageSrc) return;

    try {
      this.isLoading = true; 
      const model = await cocoSsd.load();
      const img = new Image();
      img.src = this.imageSrc;

      img.onload = async () => {
        const predictions = await model.detect(img);
        this.results = predictions.map((p) => ({
          class: p.class,
          score: p.score,
        }));
        this.isLoading = false; 
      };
    } catch (error) {
      console.error("Erreur d'analyse de l'image :", error);
      this.isLoading = false; 
    }
  }
}
