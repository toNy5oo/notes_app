export const enum noteColors {
  RED = "#f47373",
  GREEN = "#37d67a",
  BLUE = "#2ccce4",
  YELLOW = "#ccc20c",
  ORANGE = "#ff8a65",
  GREY = "#e3e3e3",
}

export const colors: string[] = [
  noteColors.RED,
  noteColors.BLUE,
  noteColors.GREEN,
  noteColors.YELLOW,
  noteColors.ORANGE,
];

export function parseColor(color: string) {
  color = color.toLowerCase();
  console.log(color)
  switch (color) {
    case noteColors.RED.toLowerCase():
      return "noteRed";
    case noteColors.GREEN.toLowerCase():
      return "noteGreen";
    case noteColors.BLUE.toLowerCase():
      return "noteBlue";
    case noteColors.YELLOW.toLowerCase():
      return "noteYellow";
    case noteColors.ORANGE.toLowerCase():
      return "noteOrange";
    default:
      return "noteGrey";
  }
}
