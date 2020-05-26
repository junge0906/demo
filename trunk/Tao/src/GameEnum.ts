enum EGameStatue
{
    NONE,
    /**主屏 界面  */
    HOME,
    /**塑形  */
    SHAPE,
    /**烧制  */
    FIRESHAPE,
    /**抛光  */
    POLISH,
    /** 上色  */
    ADDCOLOR,
    /**添加贴图*/
    ADDTEXTURE,
    /**展示*/
    EXHIBITION,
    /**拍卖*/
    Auction,
    /**结算   */
    Settlement
}
/**事件 类型*/
enum EMessageType
{
    SHOW_LOAD_SUCC = "show_load_suc",

    /** 返回开始界面  */
    GOHOME="gohome",
    /** 改变状态  */
    CHANGESTATE="changestuate",
    /**塑形 进度   */
    PROGRESS_SHAP="shap_progress",
    /**涂色 进度   */
    PROGRESS_ADDCOLOR="addcolor_progress",
    
    /**抛光 进度   */
    PROGRESS_POLISH="polish_progress",
    /**添加贴图完成  */
    ADDTEXTURE_FISNISH="addtexture_finish",
      /** 掩藏边框  */
      HIDEBORDER="HIDEBORDER",
      /** 重置  */
      RESET="reset",
      
      /** 改变颜色  */
      CHANGECOLOR="changeColor",
      
      /** 改变贴图  */
      CHANGETEXTURE="changetexture",
            
      /** 游戏关卡类型  */
      GAMELEVELTYPE="gamelevelType",
}

export{EGameStatue,EMessageType}