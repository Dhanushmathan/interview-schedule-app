import PropTypes from 'prop-types';

const FormTextArea = ({ label, name, placeholder, register, error }) => {
    return (
        <div className='space-y-1'>
            <label htmlFor={name}>{label}</label>
            <textarea name={name} id={name} placeholder={placeholder} {...register} className='px-4 py-2 bg-gray-200 rounded outline-none w-full'></textarea>
            {error && <span className='text-red-500 font-semibold'>{error.message}</span>}
        </div>
    )
};

FormTextArea.propTypes = {
    placeholder: PropTypes.string.isRequired,
    register: PropTypes.object.isRequired,
    error: PropTypes.object,
};

export default FormTextArea;