const avatarNames = [
  "Jasper",
  "Patches",
  "Sadie",
  "Baby",
  "Zoe",
  "Kiki",
  "Bailey",
  "Socks",
  "Milo",
  "Max",
  "Harley",
  "Simon",
  "Chloe",
  "Chloe",
  "Gizmo",
  "Bubba",
  "Salem",
  "Cookie",
  "Miss kitty",
  "Kitty",
];

const setUserImg = () => {
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${
    avatarNames[Math.floor(Math.random() * avatarNames.length - 1)]
  }`;
};

export default setUserImg;
