import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

export default function AccountsDetailsButton({ insertExpense, navigate }) {
  AccountsDetailsButton.propTypes = {
    insertExpense: PropTypes.object,
    navigate: PropTypes.any,
  };
  return (
  
          <div className="pt-1 mt-1 d-flex justify-content-end gap-2">
            <Button
              color="primary"
              type="button"
              className="btn mr-2 shadow-none"
              onClick={() => {
                insertExpense();
              }}
            >
              {' '}
              Save & Continue
            </Button>
            <Button
              className="shadow-none"
              color="dark"
              onClick={() => {
                if (
                  window.confirm(
                    'Are you sure you want to cancel  \n  \n You will lose any changes made',
                  )
                ) {
                  navigate(-1);
                }
              }}
            >
              Cancel
            </Button>
          </div>
        
  );
}
