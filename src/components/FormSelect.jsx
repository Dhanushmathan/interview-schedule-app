import PropTypes from 'prop-types';

const FormSelect = ({ name, register, error }) => {
    return (
        <div>
            <select name={name} id="jobRole" className="px-4 py-2 bg-gray-200 rounded outline-none w-full" {...register}>
                <option value="">--Select JobRole--</option>
                <option value="ui-developer">UI Developer</option>
                <option value="backend-developer">Backend Developer</option>
                <option value="databese-developer">Database Dveloper</option>
                <option value="fullsatckdeveloper">Full Stack Developer</option>
            </select>
            {error && <span className='text-red-500 font-semibold'>{error.message}</span>}
        </div>
    )
};

FormSelect.propTypes = {
    name: PropTypes.string.isRequired,
    register: PropTypes.object.isRequired,
    error: PropTypes.object,
};

export default FormSelect;