package repositories

import (
	"blog-server-using-clean-architecture/internal/entities"
	"gorm.io/gorm"
)

type PostRepository interface {
	GetAllPost() ([]*models.Post, error)
	GetPostByID(id string) (*models.Post, error)
	CreatePost(post *models.Post) (*models.Post, error)
	UpdatePost(post *models.Post, id string) (*models.Post, error)
	DeletePost(id string) error
}

type PostRepositoryDB struct {
	DB *gorm.DB
}

func (db *PostRepositoryDB) GetPostByID(id string) (post *models.Post, err error) {

	if err = db.DB.Preload("User").First(&post, id).Error; err != nil {
		return 
	}

	return
}

func (db *PostRepositoryDB) GetAllPost() (post []*models.Post, err error) {

	if err = db.DB.Preload("User").Find(&post).Error; err != nil {
		return 
	}

	return
}

func (db *PostRepositoryDB) CreatePost(post *models.Post) (createdPost *models.Post, err error) {

	if err = db.DB.Create(&post).Error; err != nil {
		return 
	}

	if err = db.DB.Preload("User").First(&createdPost, post.ID).Error; err != nil {
		return 
	}

	return
}

func (db *PostRepositoryDB) UpdatePost(post *models.Post, id string) (UpdatedPost *models.Post, err error) {


	if err = db.DB.Preload("User").First(&UpdatedPost, id).Error; err != nil {
		return 
		//we should use errors.New() for defining the error
		//errors library should be imported
	}

	// UpdatedPost.Title = post.Title
	// UpdatedPost.Description = post.Description

	if err = db.DB.Model(&UpdatedPost).Updates(models.Post{Title: post.Title, Description: post.Description}).Error; err != nil {
		return 
	}

	return

}

func (db *PostRepositoryDB) DeletePost(id string) (err error) {

	if err = db.DB.Preload("User").Delete(&models.Post{}, id).Error; err != nil {
		return
	}

	return
}

func NewPostRepository(db *gorm.DB) *PostRepositoryDB{
	return &PostRepositoryDB{DB:db}
}