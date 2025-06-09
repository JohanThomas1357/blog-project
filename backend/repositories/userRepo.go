package repositories

import (
	"blog-server-using-clean-architecture/internal/entities"
	"gorm.io/gorm"
)

type UserRepository interface{
	Register(user *models.User)(error)
	FindByEmail(email string)(*models.User,error)
	GetAllUsers()([]*models.User,error)
	GetUserByID(id string)(*models.User,error)
	UpdateUser(id string, value *models.User)(*models.User,error)
	DeleteUser(id string)(error)
}

type UserRepositoryDB struct{
	DB *gorm.DB
}

func(db *UserRepositoryDB)Register(user *models.User)(err error){

	if err = db.DB.Create(&user).Error;err!=nil{
		return err
	}

	return 
}

func(db *UserRepositoryDB)FindByEmail(email string)(user *models.User,err error){


	if err=db.DB.Where("email=?",email).First(&user).Error;err!=nil{
		return nil,err
	}

	return
}

func(db *UserRepositoryDB)GetAllUsers()(users []*models.User,err error){
	if err = db.DB.Find(&users).Error;err!=nil{
		return 
	}
	return
}

func(db *UserRepositoryDB)GetUserByID(id string)(user *models.User,err error){
	
	if err = db.DB.Preload("Posts").First(&user,id).Error;err!=nil{
		return
	}
	return
}

func(db *UserRepositoryDB)UpdateUser(id string,value *models.User)(user *models.User,err error){

	if err = db.DB.First(&user, id).Error; err != nil {
        return nil, err
    }


	if err = db.DB.Model(&user).Select("Name","Bio","Email").Updates(&value).Error;err!=nil{
		return
	}
	return
}

func(db *UserRepositoryDB)DeleteUser(id string)(err error){
	if err = db.DB.Delete(&models.User{},id).Error;err!=nil{
		return
	}

	if err = db.DB.Where("user_id",id).Delete(&models.Post{}).Error;err!=nil{
		return
	}
	return
}

func NewUserRepository(db *gorm.DB) *UserRepositoryDB {
	return &UserRepositoryDB{DB: db}
}
