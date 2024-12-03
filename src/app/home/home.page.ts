import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  imageSrc: string | null = null; // Image capturée
  results: { class: string; score: number }[] = []; // Résultats de détection

  constructor() {
    tf.ready().then(() => console.log('TensorFlow Ready'));
  }

  async captureImage() {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl, // Retourne une base64
      });

      this.imageSrc = photo.dataUrl || null; // Définit l'image capturée
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
