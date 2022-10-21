import React, {useState, useEffect } from 'react'
import {db} from '../firebase';//'db'
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';

const Formulario = () => {
    const [nombre, setNombre] = useState ('')
    const [apellido, setApellido] = useState ('')
    const [edad, setEdad] = useState ('')
    const [deporte, setDeporte] = useState ('')
    const [estatura, setEstatura] = useState ('')
    const [peso, setPeso] = useState ('')
    const [nacionalidad, setNacionalidad] = useState ('')

    const [listaDeportistas, setListaDeportistas] = useState ([])
    const [modoEdicion, setModoEdicion] = useState (false)
    const [id, setId] = useState ('')


    useEffect (()=>{
        const obtenerDatos = async () => {
            try{
                await onSnapshot (collection(db, "Deportistas"), (query)=>{ 
                    setListaDeportistas(query.docs.map((doc)=>({...doc.data(), id:doc.id})))
                })
            }catch(error){
                console.log(error)
            }
        }
        obtenerDatos ();
    }, [])

    const eliminar = async id=>{
        try{
            await deleteDoc(doc(db, 'Deportistas', id))
        }catch(error){
            console.log(error)
        }
    }

    const guardarDeportistas = async(e) => {
        e.preventDefault ()
        try {
            const data = await addDoc(collection(db, 'Deportistas'),{
                campoNombre: nombre,
                campoApellido: apellido,
                campoEdad: edad,
                campoDeporte: deporte,
                campoEstatura: estatura,
                campoPeso: peso,
                campoNacionalidad: nacionalidad
            })
            setListaDeportistas([
                ...listaDeportistas,
                {campoNombre: nombre, campoApellido: apellido, campoEdad: edad, campoDeporte: deporte, campoEstatura: estatura, campoPeso: peso, campoNacionalidad: nacionalidad, id:data.id}
            ])

            setNombre ('')
            setApellido ('')
            setEdad ('')
            setDeporte ('')
            setEstatura ('')
            setPeso ('')
            setNacionalidad ('')

        }catch(error){
            console.log(error)
        }
    }

    const editar = item =>{
        setNombre (item.campoNombre)
        setApellido(item.campoApellido)
        setEdad (item.campoEdad)
        setDeporte (item.campoDeporte)
        setEstatura (item.campoEstatura)
        setPeso (item.campoPeso)
        setNacionalidad (item.campoNacionalidad)
        setId(item.id)
        setModoEdicion(true)
    }

    const editarDeportistas = async (e) => {
        e.preventDefault()
        try{
            const docRef = doc(db, 'Deportistas', id);
            await updateDoc(docRef, {
                campoNombre: nombre,
                campoApellido:apellido,
                campoEdad: edad, 
                campoDeporte: deporte, 
                campoEstatura: estatura, 
                campoPeso: peso, 
                campoNacionalidad: nacionalidad
            })

            const nuevoArray = listaDeportistas.map(
                item => item.id === id ? {id: id, campoNombre:nombre, campoApellido:apellido, campoEdad: edad, campoDeporte: deporte, campoEstatura: estatura, campoPeso: peso, campoNacionalidad: nacionalidad} : item 
            )
            
            setListaDeportistas(nuevoArray)
            setNombre('')
            setApellido('')
            setEdad ('')
            setDeporte ('')
            setEstatura ('')
            setPeso ('')
            setNacionalidad ('')
            setId('')
            setModoEdicion(false)

        }catch(error){
            console.log(error)
        }
    }

    const cancelar = () =>{
        setModoEdicion(false)
        setNombre ('')
        setApellido ('')
        setEdad ('')
        setDeporte ('')
        setEstatura ('')
        setPeso ('')
        setNacionalidad ('')
        setId ('')
    }

    return (
        <div className='container mt-5'>
            
            <h1 className='text-center'>DEPORTISTAS</h1>
            <hr />
            <div className="row">
                <div className='col-8'>
                    <h4 className="text-center">LISTADO DE DEPORTISTAS</h4>
                    <ul className="list-group">
                        {
                            listaDeportistas.map(item => (
                                <li className= "list-group-item" key={item.id}>
                                    <span className="lead">{item.campoNombre} - {item.campoApellido} - {item.campoEdad} - {item.campoDeporte} - {item.campoEstatura} - {item.campoPeso} - {item.campoNacionalidad}</span>
                                    <button className="btn btn-danger btn=sm float-end mx-2"
                                    onClick={()=>eliminar(item.id)}>Eliminar</button>
                                    <button className="btn btn-warning btn=sm float-end mx-2"
                                    onClick={()=>editar(item)}>Editar</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                
            

            <div className="col-4">
                <h4 className="text-center">
                    {
                        modoEdicion ? 'Editar deportista' : 'Agregar deportista'
                    }
                </h4>
                <form onSubmit={modoEdicion ? editarDeportistas : guardarDeportistas}> 
                    <input type="text" 
                    Classname="form-control mb-2 center" 
                    placeholder='Nombre'
                    value={nombre} 
                    onChange= {(e)=>setNombre(e.target.value)}/>

                    <input type="text" 
                    Classname="form-control mb-2" 
                    placeholder='Apellido'
                    value={apellido} 
                    onChange= {(e)=>setApellido(e.target.value)}/>

                    <input type="number"
                    Classname="form-control mb-2" 
                    placeholder='Edad'
                    value={edad} 
                    onChange= {(e)=>setEdad(e.target.value)}/> 

                    <input type="text" 
                    Classname="form-control mb-2" 
                    placeholder='Deporte'
                    value={deporte} 
                    onChange= {(e)=>setDeporte(e.target.value)}/>

                    <input type="text" 
                    Classname="form-control mb-2" 
                    placeholder='Estatura'
                    value={estatura} 
                    onChange= {(e)=>setEstatura(e.target.value)}/> 

                    <input type="number" 
                    Classname="form-control mb-2" 
                    placeholder='Peso'
                    value={peso} 
                    onChange= {(e)=>setPeso(e.target.value)}/> 

                    

                    {
                        modoEdicion ?
                        (
                            <>
                                <button
                                className='btn btn-warning btn-block'
                                on='submit'>Editar</button>
                                <button
                                className='btn btn-dark btn-block mx-2'
                                onClick= {()=>cancelar()}>Cancelar</button>
                            </>
                        )
                        :
                        
                    <button 
                        type='submit'
                        className='btn btn-primary btn-block'>
                        Agregar
                    </button>
                    }
                </form>
                
            </div>
            </div>

        </div>
    )
}

export default Formulario