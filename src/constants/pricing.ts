/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export interface PricingItem {
  id: string;
  name: string;
  washPrice: number;
  ironPrice: number;
}

export const PRICING_DATA: PricingItem[] = [
  { id: '1', name: 'Shirt', washPrice: 50, ironPrice: 10 },
  { id: '2', name: 'Pant (Normal/Jeans)', washPrice: 50, ironPrice: 10 },
  { id: '3', name: 'T-Shirt', washPrice: 50, ironPrice: 10 },
  { id: '4', name: 'Panjabi / Jubba', washPrice: 60, ironPrice: 15 },
  { id: '5', name: 'Sherwani', washPrice: 150, ironPrice: 50 },
  { id: '6', name: 'Pajama', washPrice: 50, ironPrice: 10 },
  { id: '7', name: 'Sweater', washPrice: 200, ironPrice: 40 },
  { id: '8', name: 'Fotua', washPrice: 50, ironPrice: 10 },
  { id: '9', name: 'Koti', washPrice: 150, ironPrice: 50 },
  { id: '10', name: 'Tie', washPrice: 20, ironPrice: 0 },
  { id: '11', name: 'Bed Sheet', washPrice: 100, ironPrice: 40 },
  { id: '12', name: 'Pillow Cover', washPrice: 30, ironPrice: 10 },
  { id: '13', name: 'Sofa Cover', washPrice: 200, ironPrice: 0 },
  { id: '14', name: 'Leper Cover', washPrice: 150, ironPrice: 0 },
  { id: '15', name: 'Comforter (Small)', washPrice: 300, ironPrice: 0 },
  { id: '40', name: 'Comforter (Big)', washPrice: 400, ironPrice: 0 },
  { id: '16', name: 'Mosquito net', washPrice: 100, ironPrice: 0 },
  { id: '17', name: 'Jaynamaj', washPrice: 150, ironPrice: 0 },
  { id: '18', name: 'Cap / Tupi', washPrice: 20, ironPrice: 0 },
  { id: '19', name: 'Gilaf', washPrice: 50, ironPrice: 0 },
  { id: '20', name: 'Blazer', washPrice: 250, ironPrice: 0 },
  { id: '21', name: 'Suit / Coat', washPrice: 350, ironPrice: 0 },
  { id: '22', name: 'Blanket (Single)', washPrice: 450, ironPrice: 0 },
  { id: '41', name: 'Blanket (Double)', washPrice: 600, ironPrice: 0 },
  { id: '23', name: 'Curtain', washPrice: 170, ironPrice: 60 },
  { id: '24', name: 'Jacket', washPrice: 250, ironPrice: 0 },
  { id: '25', name: 'Shawl', washPrice: 200, ironPrice: 0 },
  { id: '26', name: 'Saree / Shari', washPrice: 200, ironPrice: 0 },
  { id: '27', name: 'Three-Piece', washPrice: 150, ironPrice: 30 },
  { id: '28', name: 'Hijab / Nikaab', washPrice: 50, ironPrice: 10 },
  { id: '29', name: 'School Dress', washPrice: 120, ironPrice: 20 },
  { id: '30', name: 'Burka', washPrice: 200, ironPrice: 0 },
  { id: '31', name: 'Lehenga', washPrice: 600, ironPrice: 0 },
  { id: '32', name: 'Towel (Small/Big)', washPrice: 100, ironPrice: 0 },
  { id: '33', name: 'Trouser', washPrice: 50, ironPrice: 0 },
  { id: '34', name: 'Meksi', washPrice: 80, ironPrice: 0 },
  { id: '35', name: 'Apron', washPrice: 60, ironPrice: 10 },
  { id: '36', name: 'Orna', washPrice: 50, ironPrice: 10 },
  { id: '37', name: 'Plazzo', washPrice: 50, ironPrice: 10 },
  { id: '38', name: 'Selowar', washPrice: 50, ironPrice: 10 },
  { id: '39', name: 'Kamiz', washPrice: 50, ironPrice: 10 },
];
