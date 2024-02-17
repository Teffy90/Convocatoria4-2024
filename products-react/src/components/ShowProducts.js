import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../Function';

const ShowProducts = () => {
    const url = "https://api.escuelajs.co/api/v1/products";
    const [products, setProducts] = useState([]);

    const [id, setId] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategories] = useState('');
    const [name, setName] = useState('');
    const [images, setImages] = useState('');
    const [operation, setOperation] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const respuesta = await axios.get(url);
        setProducts(respuesta.data);
        console.log(respuesta)
    }

    const openModal = (op, id, title, price, description, images, category) => {
        setId('');
        setName('');
        setPrice('');
        setDescription('');
        setImages('');
        setCategories('');
        setOperation(op);
        if(op === 1){
            setTitle('Registrar Producto');
        }
        else if(op === 2){
            setTitle('Editar Producto');
            setId(id);
            setName(title);
            setPrice(price);
            setDescription(description);
            setImages(images);
            setCategories('');
        }
        window.setTimeout(function(){
            document.getElementById('nombre').focus();
        },500);
    }


    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='d-grid mx-auto'>
                            <button onClick={()=> openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalProducts'>Añadir</button>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12 col-lg-8 offset-lg-2'>
                        <div className='table-responsive'>
                            <table className='table table bordered'>
                                <thead>
                                    <tr><th>#</th><th>Nombre</th><th>Precio</th><th>Descripcion</th><th>Imagen</th><th>Categoria</th><th>Acciones</th></tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.title}</td>
                                            <td>{product.price}</td>
                                            <td>{product.description}</td>
                                            <td><img src={product.images} className="img-thumbnail" alt='' /></td>
                                            <td>Aqui va la categoria</td>
                                            <td>
                                                <button onClick={()=> openModal(2,product.id, product.title,product.price, product.description,product.images )} type="button" class="btn btn-warning"  data-bs-toggle='modal' data-bs-target='#modalProducts' >Editar</button>
                                                <button type="button" class="btn btn-danger">Eliminar</button>

                                            </td>
                                        </tr>

                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id='modalProducts' className='modal fade' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>{title}</label>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
                        </div>
                        <div className='modal-body'>
                            <input type='hidden' id='id'></input>
                            <div className='input-group mn-3'>
                                <spam className='input-group-text'></spam>
                                <input type='text' id='nombre' className='form-control' placeholder='Nombre' value={name}
                                    onChange={(e) => setName(e.target.value)}></input>
                            </div>
                            <br />
                            <div className='input-group mn-3'>
                                <spam className='input-group-text'></spam>
                                <input type='text' id='precio' className='form-control' placeholder='precio' value={price}
                                    onChange={(e) => setPrice(e.target.value)}></input>
                            </div>
                            <br />
                            <div className='input-group mn-3'>
                                <spam className='input-group-text'></spam>
                                <input type='text' id='descripcion' className='form-control' placeholder='Descripcion' value={description}
                                    onChange={(e) => setDescription(e.target.value)}></input>
                            </div>
                            <br />
                            <div className='input-group mn-3'>
                                <spam className='input-group-text'></spam>
                                <input type='text' id='imagen' className='form-control' placeholder='Imagen' value={images}
                                    onChange={(e) => setImages(e.target.value)}></input>
                            </div>
                            <br />
                            <div className='input-group mn-3'>
                                <spam className='input-group-text'></spam>
                                <input type='text' id='categorias' className='form-control' placeholder='Categorias' value={category}
                                    onChange={(e) => setCategories(e.target.value)}></input>
                            </div>
                            <br />
                            <div className='d-grid col-6 mx-auto'>
                                <button type="button" class="btn btn-success">Guardar</button>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" class="btn btn-secondary">Cerrar</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ShowProducts