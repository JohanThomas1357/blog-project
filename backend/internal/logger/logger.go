package logger

import("go.uber.org/zap")

var sugar *zap.SugaredLogger

func InitLogger(){
	logger,_ := zap.NewDevelopment()
	sugar =logger.Sugar()
	defer logger.Sync()
}

func GetLogger()*zap.SugaredLogger{
	if sugar == nil{
		InitLogger()
	}
	return sugar
}