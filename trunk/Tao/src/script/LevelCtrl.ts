export default class LevelCtrl {
    private static level = 1;
    private static hide_Level = 100001
    public static GetLevel() {
        return LevelCtrl.level;
    }
    public static SaveLevel(level : number) {
        LevelCtrl.level = level;
    }

    public static getHideLevel() {
        return LevelCtrl.hide_Level;
    }
    public static saveHideLevel() {
        LevelCtrl.hide_Level = this.hide_Level;
    }
}