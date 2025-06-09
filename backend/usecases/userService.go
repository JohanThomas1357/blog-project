package usecases

import (
	"blog-server-using-clean-architecture/internal/auth"
	"blog-server-using-clean-architecture/internal/entities"
	"blog-server-using-clean-architecture/internal/logger"
	"blog-server-using-clean-architecture/internal/packets"
	"blog-server-using-clean-architecture/repositories"

	"golang.org/x/crypto/bcrypt"
)

type UserServiceInterface interface {
	RegisterService(*models.User) error
	FindByEmailService(string) (*models.User, error)
	UserAuthCheck(string, string) (packets.AuthResponse, error)
	GetAllUsers() ([]*models.User, error)
	GetUserByID(string) (*models.User, error)
	UpdateUser(string, *models.User) (*models.User, error)
	DeleteUser(string)(error)
}

type UserService struct {
	UserRepo repositories.UserRepository
}

func (s *UserService) RegisterService(user *models.User) (err error) {

	zap := logger.GetLogger()

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)

	if err != nil {
		zap.Warnf("Could not hash the password")
		return
	}

	user.Password = string(hashedPassword) //It is important to convert hashed password to string
	return s.UserRepo.Register(user)
}

func (s *UserService) FindByEmailService(email string) (*models.User, error) {
	return s.UserRepo.FindByEmail(email)
}

// here we are using response as value type rather than pointer since it need not be changed in any other places
func (s *UserService) UserAuthCheck(email string, password string) (response packets.AuthResponse, err error) {

	zap := logger.GetLogger()

	user, err := s.FindByEmailService(email)

	if err != nil {
		zap.Warnf("User not found")
		zap.Error(err)
		return response, err
	}

	if err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		zap.Warnf("Invalid Credential")
		return
	}

	//token generation
	token, err := auth.GenerateToken(user.ID)

	if err != nil {
		zap.Warnf("Failed to generate token")
	}

	response.Token = token
	response.User = user

	return
}

func (s *UserService) GetAllUsers() (users []*models.User, err error) {
	zap := logger.GetLogger()

	users, err = s.UserRepo.GetAllUsers()

	if err != nil {
		zap.Warnf("Cannot fetch users data")
		return
	}

	return
}

func (s *UserService) GetUserByID(id string) (user *models.User, err error) {
	user, err = s.UserRepo.GetUserByID(id)
	zap := logger.GetLogger()
	if err != nil {
		zap.Warnf("Cannot fetch user")
		return
	}
	return
}

func (s *UserService) UpdateUser(id string, value *models.User) (user *models.User, err error) {

	user, err = s.UserRepo.UpdateUser(id, value)

	if err != nil {
		return
	}
	return
}

func (s *UserService) DeleteUser(id string)(err error){
	if err = s.UserRepo.DeleteUser(id);err!=nil{
		return
	}
	return
}

func NewUserService(repo repositories.UserRepository) UserServiceInterface {
	return &UserService{UserRepo: repo}
}
