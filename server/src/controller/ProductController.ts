import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Product } from "../entity/Product";
import { Store } from "../entity/Store";


export default class ProductController{

static listAll = async (req: Request, res: Response) => {
  //Get Products from database
  const productsRepository = getRepository(Product);
  const products = await productsRepository.find({ relations: ["ProductStore"] });

  //Send the Products objects
  res.send(products);
};

static updatePicture = async (Image,reference ) => {
  //Get the ID from the url
  console.log("Ref : "+reference);

  //Get the user from database
  const productRepository = getRepository(Product);

    const product = await  productRepository.findOne({ Reference:reference }); 
    product.Image=Image;
    await  productRepository.save(product);
    //const user = await userRepository.findOneOrFail(username, {
     //  select: ["username", "id", "role"] //We dont want to send the password on response
    // });
 

};
static newProduct = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { ProductName,Price, Reference,storeID,Image } = req.body;
    console.log(req.body)

    let store;
    const storeRepository = getRepository(Store);
    try {
      store =  await storeRepository.findOneOrFail({ where: { id: storeID } })
   }catch (error) {
     res.status(404).send("Please Verify storeID");
     return;

   }
    let product = new Product();
    product.ProductName = ProductName;
    product.Price = Price;
    product.Image=Image;
    product.Reference = Reference;
    product.FP = Price*0.03*1000;
    product.ProductStore=store;
    //Validade if the parameters are ok
    const errors = await validate(product);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Try to save.
    const productsRepository = getRepository(Product);
    try {
      await productsRepository.save(product);
    } catch (e) {
      console.log (e);
      res.status(409).send("Error has been occured try again ! ");
      return;
    }
    //If all ok, send 201 response
    res.status(201).send("product saved");
  };

  static editProduct = async (req: Request, res: Response) => {
    //Get values from the body
    const { id,ProductName,Price,PromoPrice,ReductionPerc,Reference,ProductStore} = req.body;
    
  console.log(req.body);
    //Try to find client on database
    const productsRepository = getRepository(Product);
    let product:Product;
    try {
        product = await productsRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Product not found");
      return;
    }
  
    //Validate the new values on model
    product.ProductName = ProductName;
    product.Price = Price;
    product.Reference = Reference;
    product.ProductStore=ProductStore;
    product.PromoPrice=0
    product.FP=Price*0.03*1000;
   
  //  product.PromoPrice = PromoPrice;
 //   product.ReductionPerc = ReductionPerc;
   // product.FP = FP;

    
    const errors = await validate(product);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Try to save ; 
    try {
      await productsRepository.save(product);
    } catch (e) {
      res.status(409).send("Error has been occured try again !");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };


  
  static editProductWithImage = async (req: Request, res: Response) => {
    //Get values from the body
    const { id,ProductName,Price, Reference,storeID,Image,ProductStore  } = req.body;
    console.log(id,ProductName,Price, Reference,storeID,Image,ProductStore );
    let store;
    const storeRepository = getRepository(Store);
    try {
      store =  await storeRepository.findOneOrFail({ where: { id: storeID } })
   }catch (error) {
     res.status(404).send("Please Verify storeID");
     return;

   }
    //Try to find client on database
    const productsRepository = getRepository(Product);
    let product;
    try {
        product = await productsRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(402).send("Product not found");
      return;
    }
  
    //Validate the new values on model
    product.ProductName = ProductName;
    product.Price = Price;
    product.Image=Image;
    product.Reference = Reference;
    product.PromoPrice = 123;
    product.ReductionPerc = 10;
    product.FP = 10;
    product.ProductStore=ProductStore
   // product.FP = FP;

    
    const errors = await validate(product);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Try to save ; 
    try {
      await productsRepository.save(product);
    } catch (e) {
      res.status(409).send("Error has been occured try again !");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

/* static getOneById = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id =  req.params.id;

  //Get the user from database
  const adminRepository = getRepository(Admin);
  try {
    const user = await adminRepository.findOneOrFail(id, {
      select: ["id", "username", "role"] //We dont want to send the password on response
    });
  } catch (error) {
    res.status(404).send("User not found");
  }
}; 
 */

 

static getProductsByStoreId = async (req: Request, res: Response) => {
  //Get the phoneNumber from request body
  let { StoreId } = req.body;
  //Get the admin from database
  const productRepository = getRepository(Product);
  const storeRepository = getRepository(Store);

  let store
  try {
   store =  await storeRepository.findOneOrFail({ where: { id: StoreId } })
 }catch (error) {
   res.status(401).send("StoreID doesnt exist ");


 }
  try {
   // const user = await  adminRepository.findOneOrFail({ phoneNumber }); 
   
    let products = await productRepository.find({ProductStore:store})
    res.send(products);
  } catch (error) {
    res.status(404).send("Products not found");
  }
};



static setReductionForAProduct = async (req: Request, res: Response) => {
  //Get the phoneNumber from request body
  let { ProductId,Reduction } = req.body;

  const productRepository = getRepository(Product);
  
  try {
      let product : Product = new Product();
    product = await productRepository.findOne({ where: {id:ProductId} })
    let newproductprice=Math.round(product.Price-(product.Price*Reduction/100));
    product.PromoPrice=newproductprice
    product.FP=newproductprice*0.03*1000;
    productRepository.save(product);
    
    res.send(product);
  } catch (error) {
    res.status(404).send("Product Not found");
  }
};
 
static deleteProduct = async (req: Request, res: Response) => {
  //Get the ID from the url
 console.log(req.headers)
  const id = req.params.id;
  const productsRepository = getRepository(Product);
  let product: Product;
  try {
    product = await productsRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).send("Product not found");
    return;
  }
  productsRepository.delete(product);
  //After all send a 204 (no content, but accepted) response
  res.status(204).send();
};

};
