import boheme from "./style-boheme-chic-dynamique.json";
import princesse from "./forme-princesse-dynamique.json";
import minimaliste from "./minimaliste-dynamique.json";
import sirene from "./forme-princesse-dynamique.json";

// Sélectionner uniquement les 4 premières robes du style "princesse"
const princessRobes = princesse.slice(0, 4);

// Fusionner toutes les robes et enlever les doublons
const allRobes = [...princessRobes, ...sirene, ...minimaliste, ...boheme];
const robes = allRobes.reduce((acc, robe) => {
  if (!acc.some((r) => r.dressName === robe.dressName)) {
    acc.push(robe);
  }
  return acc;
}, []);

export default robes;
