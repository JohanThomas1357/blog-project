package auth

import (
	"blog-server-using-clean-architecture/internal/logger"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
)
func GenerateToken(userID uint)(string,error){
	zap := logger.GetLogger()
	//Access the secret key
	if err:=godotenv.Load();err!=nil{
		zap.Fatalf("Error in accessing the environmental variable")
	}

	jwt_key:=os.Getenv("JWT_SECRET_KEY")

	zap.Debug("%T:%v",userID,userID)
	claims:= jwt.MapClaims{
		"user_id":userID,
		"exp":time.Now().Add(24*time.Hour).Unix(),
	}

	token:=jwt.NewWithClaims(jwt.SigningMethodHS256,claims)

	return token.SignedString([]byte(jwt_key))
}