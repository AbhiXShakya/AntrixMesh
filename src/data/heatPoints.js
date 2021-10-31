// import n from "country-js";
// import axios from "axios";

// console.log(n.search("us"));

// let heatPoints = [];

// (() => {
//   let heatarray = axios.get(
//     `https://test-backend-4.abhixshakya.repl.co/rss/country/count`
//   );

//   for (const [key, value] of Object.entries(heatarray.data.collections)) {
//     if (key !== "NOT Found") {
//       console.log(`${key}: ${value}`);
//       let ltng = n.search(key)[0].geo;
//       heatPoints.push({
//         lat: ltng.latitude,
//         lng: ltng.longitude,
//         count: value,
//       });
//     }
//   }
// })();

// export default heatPoints;

export const heatpoints = [
  { lat: 24.6408, lng: 46.7728, count: 3 },
  { lat: 50.75, lng: -1.55, count: 3 },
  { lat: 23.75, lng: 78.55, count: 8 },
  { lat: 32.4279, lng: 53.688, count: 5 },
  { lat: 43.076, lng: -107.2903, count: 8 },
  { lat: 30.3753, lng: 69.3451, count: 7 },
  { lat: 55.3781, lng: 3.436, count: 7 },
  { lat: -14.235, lng: -51.9253, count: 9 },
  { lat: -23.4425, lng: -58.4438, count: 5 },
];
