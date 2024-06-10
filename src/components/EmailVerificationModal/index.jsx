import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

const EmailVerificationModal = ({ isOpen, onRequestClose }) => {
  const [otp, setOtp] = useState('');

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerify = () => {
    // Add OTP verification logic here
    alert(`OTP entered: ${otp}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Email Verification"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          padding: '20px',
        },
      }}
    >
      <h2>Email Verification</h2>
      <p>Please enter the OTP sent to your email:</p>
      <input
        type="text"
        value={otp}
        onChange={handleOtpChange}
        maxLength="6"
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handleVerify} style={{ padding: '10px 20px' }}>Verify</button>
        <button onClick={onRequestClose} style={{ padding: '10px 20px' }}>Close</button>
      </div>
    </Modal>
  );
};

export default EmailVerificationModal;
