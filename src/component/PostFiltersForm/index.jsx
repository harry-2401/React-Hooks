import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';

PostFiltersForm.propTypes = {
  onSubmit: PropTypes.func,
};

PostFiltersForm.defaultProps = {
  onSubmit: null,
}

function PostFiltersForm(props) {
  const {onSubmit} = props;
  const [searchTerm, setSearchTerm] = useState('');
  const typingTimeoutref = useRef(null);

  function handleSearchTermChange(e) {
    const value = e.target.value;
    setSearchTerm(value);
    if(!onSubmit) return;
  
    if(typingTimeoutref.current) {
      clearTimeout(typingTimeoutref.current);
    }

    typingTimeoutref.current = setTimeout(() => {
      const formValues = {
        searchTerm: value,  
      }
      onSubmit(formValues);
    }, 300);
    e.preventDefault();
  }

  return (
    <form action="">
      <input type="text" 
        value={searchTerm}
        onChange={handleSearchTermChange}  
      />
    </form>
  );
}

export default PostFiltersForm;