export const enum noteColors {
  RED = "#fcb3b3",
  GREEN = "#a3e8c0",
  BLUE = "#a0e9f4",
  YELLOW = "#f3ed7d",
  ORANGE = "#ffc38d",
  GREY = "#e3e3e3",
}

export const colors: string[] = [
  noteColors.GREY,
  noteColors.RED,
  noteColors.BLUE,
  noteColors.GREEN,
  noteColors.YELLOW,
  noteColors.ORANGE,
];

export function parseColor(color: string) {
  color = color.toLowerCase();
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
