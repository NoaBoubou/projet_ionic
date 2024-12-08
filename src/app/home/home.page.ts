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

  constructor() {
    tf.ready().then(() => console.log('TensorFlow Ready'));
  }

  async captureImage() {
    try {
      const photo = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        source: CameraSource.Camera,
        resultType: CameraResultType.DataUrl, 
      });

      this.imageSrc = photo.dataUrl || null; 
    } catch (error) {
      console.error('Erreur caméra :', error);
    }
  }

  async analyzeImage() {
    if (!this.imageSrc) return;

    try {
      const model = await cocoSsd.load();
      const img = new Image();
      img.src = this.imageSrc;

      img.onload = async () => {
        const predictions = await model.detect(img);
        this.results = predictions.map((p) => ({
          class: p.class,
          score: p.score,
        }));
      };
    } catch (error) {
      console.error('Erreur d\'analyse :', error);
    }
  }
}
