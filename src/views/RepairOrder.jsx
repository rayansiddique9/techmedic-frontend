import { useFormik } from 'formik'
import React, { useContext, /*useMemo*/ } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader';
// import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { context } from '../context/Context';
import * as Yup from 'yup'
import { toast } from 'react-toastify';

// const GOOGLE_API_KEY = 'AIzaSyAErciOzN1f8JUxCsdOniYUn6eOzrDqlBY';

const RepairOrder = () => {

    const [authtoken] = useContext(context);
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: GOOGLE_API_KEY,
//   });

  const repairOrderSchema = Yup.object().shape({
    name: Yup.string().required('Device Name is Required').label('Location'),
    details: Yup.string().required('Details are Required').label('Location'),
    location: Yup.string().required('Location is Required').label('Location'),
  });

  const navigate = useNavigate();
    
//   const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  const formik = useFormik({
    initialValues: {
        name: '',
        details: '',
        location: ''
    },
    validationSchema: repairOrderSchema,
    onSubmit: async ({ name, details, location }, { resetForm, setSubmitting }) =>
    {
        try
        {
            setSubmitting(true);
            await fetch('http://localhost:5000/api/orderRepair/addOrderRepair',
            {
                method: 'POST',
                headers:
                {
                    'auth-token': authtoken,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ name, details, location })
            });
    
            setSubmitting(false);
            resetForm();
            navigate('/orders');
        }
        
        catch(err)
        {
            toast.error('Unexpected error occured!');
            setSubmitting(false);
            resetForm();
            console.log(err);
        }
    }
  });

  const { touched, errors, values, handleChange, handleSubmit, isSubmitting } = formik;

  return (
    !isSubmitting /* && isLoaded */ ?
    <main className='py-5 px-2 md:px-5 lg:px-10'>
        <Link to="/products"><p className='text-4xl'>TECH<span className='text-[#13a388]'>MEDIC</span></p></Link>
        <form onSubmit={handleSubmit} className='py-10 px-2 h-[80vh] items-center'>
            <section className='space-y-10 xl:space-y-5 bg-[#ededed22] py-7 px-4 rounded-md'>
                <p className='text-3xl md:text-xl font-semibold text-[#13A388] mx-auto w-fit'>Order Repair</p>
                <article>
                    <p className='text-xl md:text-lg'>Full Device Name *</p>
                    <input placeholder={'Enter the name of your device'} onChange={handleChange} id="name" name="name" value={values.name} className='text-[#13A388] mt-2 block w-[100%] text-lg md:text-normal focus:outline-0 bg-[#444444] px-2 py-1 rounded-md' />
                    <small className='text-red-400'>{touched.name && (errors.name && errors.name.length) ? errors.name : '\xa0'}</small>
                </article>
                <article>
                    <p className='text-xl md:text-lg'>Details *</p>
                    <textarea placeholder={'Explain the problem with your device'} onChange={handleChange} id="details" name="details" value={values.details} rows="5" className='text-[#13A388] text-lg md:text-normal mt-2 block resize-none w-[100%] focus:outline-0 bg-[#444444] px-2 py-1 rounded-md' />
                    <small className='text-red-400'>{touched.details && (errors.details && errors.details.length) ? errors.details : '\xa0'}</small>
                </article>
                {/* <GoogleMap 
                    center={center}
                    mapContainerClassName='map-container'
                    zoom={1}
                /> */}
                <article>
                    <p className='text-xl md:text-lg'>Pick-up Location *</p>
                    <input placeholder={'Enter a location where we can pick-up the device'} onChange={handleChange} id="location" name="location" value={values.location} className='text-[#13A388] mt-2 text-lg md:text-normal block w-[100%] focus:outline-0 bg-[#444444] px-2 py-1 rounded-md' />
                    <small className='text-red-400'>{touched.location && (errors.location && errors.location.length) ? errors.location : '\xa0'}</small>
                </article>
                <br />
                <button disabled={isSubmitting} type={'submit'} className='text-lg block px-4 py-1 bg-[#13B388] rounded-md hover:bg-[#13A388AA] transition-all'>Place Order</button>
            </section>
        </form>
    </main> 
    : <Loader />
  )
}

export default RepairOrder