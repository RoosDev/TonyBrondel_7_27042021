interface type_Post{
  id: Number;
  content: String;
  image_URL: String;
  identity_Id: Number;
  updatedAt: Date;
}
// Mise en place des class

class thePosts{
  id: Number;
  content: String;
  image_URL: String;
  identity_Id: Number;
  updatedAt: Date;

constructor(){
    this.id = 1;
    this.content = '';
    this.image_URL = '';
    this.identity_Id = 1;
    this.updatedAt  = new Date();
  }
  getAllPosts() {
      console.log(this.id);
      return 
  }
    
  }
  