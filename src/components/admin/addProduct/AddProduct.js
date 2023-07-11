import React, { useState } from 'react'
import styles from './AddProduct.module.scss'
import Card from '../../card/Card'
import { db, storage } from '../../../firebase/Config'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { toast, ToastContainer } from 'react-toastify'
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../loader/Loader'
import { useSelector } from 'react-redux'

const categories = [
  {
    id: 1,
    name: 'Laptop'
  },
  {
    id: 2,
    name: 'Electronics'
  },
  {
    id: 3,
    name: 'Fashion'
  },
  {
    id: 4,
    name: 'Phone'
  }
]

const initialState = {
  name: '',
  imageURL: '',
  price: 0,
  category: '',
  brand: '',
  desc: ''
}

// Detect form type based on id from useParams
const detectForm = (id, f1, f2) => {
  if(id === 'ADD'){
    return f1
  }
  return f2
}

const AddProduct = () => {
  const { id } = useParams()
  const { products } = useSelector(state => state.product)
  // If id from useParams is present, find the product based on that param
  const productToEdit = products.find(item => item.id === id)

  const [product, setProduct] = useState(() => {
    // Check if initial state is used or product meant for editing, based on id
    const newState = detectForm(id, 
      {...initialState}, 
      productToEdit
      )

      return newState
  })

  const [uploadProgress, setUploadProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  // Set values from input fields into product State
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct({...product, [name]: value})
  }

  // Upload image to firebase storage
  const handleImageChange = (e) => {
    const file = e.target.files[0]

    const storageRef = ref(storage, `eShopImages/${Date.now()}${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed', 
    (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    setUploadProgress(progress)
    }, 
    (error) => {
      toast.error(error.message)
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setProduct({...product, imageURL: downloadURL})
        toast.success('Image uploaded successfully')
      });
    })
  }

  // Adds product to the firestore database
  const addProduct = (e) => {
    e.preventDefault()
    setIsLoading(true)

    try{
      const docRef = addDoc(collection(db, 'products'), {
        name: product.name,
        imageURL: product.imageURL,
        price: +product.price,
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate()
      })

      setIsLoading(false)
      toast.success('Product uploaded')
      setProduct({...initialState})
      setUploadProgress(0)
      navigate('/admin/view-products')
    }catch(error){
      toast.error(error.message)
      setIsLoading(false)
    }
  }

  // Edits the existing product in firebase
  const editProduct = (e) => {
    e.preventDefault()
    setIsLoading(true)

    if(product.imageURL !== productToEdit.imageURL){
      const storageRef = ref(storage, productToEdit.imageURL)
      deleteObject(storageRef)
    }

    try{
      setDoc(doc(db, 'products', id), {
        name: product.name,
        imageURL: product.imageURL,
        price: +product.price,
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: productToEdit.createdAt,
        editedAt: Timestamp.now().toDate()
      })

      setIsLoading(false)
      toast.success('Product edited successfully')
      navigate('/admin/view-products')
    }catch(error){
      setIsLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      <div className={styles.product}>
          <h2>{detectForm(id, 'Add New Product', 'Edit Product')}</h2>
          <Card cardClass={styles.card}>
            <form onSubmit={detectForm(id, addProduct, editProduct)}> 
              <label>Product name:</label>
              <input type="text" placeholder='Name...' required name='name' value={product.name} onChange={(e) => handleInputChange(e)} />
              <label>Product image:</label>
              <Card className={styles.group}>
                {uploadProgress === 0 ? null : (
                  <div className={styles.progress}>
                    <div className={styles['progress-bar']} style={{ width: `${uploadProgress}`}}>
                      {uploadProgress < 100 ? `Uploading ${uploadProgress}%` : `Upload complete ${uploadProgress}%`}
                    </div>
                  </div>
                )}
                <input type="file" accept='image/*' placeholder='Product image...'name='image' onChange={(e) => handleImageChange(e)}/>
                {product.imageURL === '' ? null : (
                  <input type="text" required name='imageURL' disabled placeholder='Image url...' value={product.imageURL}/>
                )}
              </Card>
              <label>Product price:</label>
              <input type="number" placeholder='Price...' name='price' value={product.price} onChange={(e) => handleInputChange(e)} />
              <label>Product category:</label>
              <select required name="category" value={product.category} onChange={(e) => handleInputChange(e)}>
                <option value="" disabled>-- Chose a category --</option>
                {categories.map(category => {
                  return (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  )
                })}
              </select>
              <label>Product brand:</label>
              <input type="text" placeholder='Brand...' required name='brand' value={product.brand} onChange={(e) => handleInputChange(e)} />
              <label>Product description:</label>
              <textarea name="desc" required onChange={(e) => handleInputChange(e)} value={product.desc} cols="30" rows="10" placeholder='Add description...'></textarea>

              <button type='submit' className='--btn --btn-primary'>{detectForm(id, 'Save Product', 'Edit Product')}</button>
            </form>
          </Card>
      </div>
    </>
  )
}

export default AddProduct