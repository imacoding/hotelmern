import React from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';

export class ZHMFileUpload extends React.Component {

    constructor(){
        super();

        this.uploadFile = this.uploadFile.bind(this);
    }

    uploadFile(event) {
  const { input: {onChange}} = this.props;
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'mernhotel');
  const options = {
    method: 'POST',
    body: formData,
  };
  fetch('https://api.cloudinary.com/v1_1/ddjfwp9wf/image/upload', options)
    .then((res) => res.json())
    .then((data) => {
      onChange(data.secure_url);
    })
    .catch((err) => console.log(err));
}

   render() {
  const { label, meta: {touched, error} } = this.props;
  return (
    <div className='form-group'>
      <label>{label}</label>
      <div className='input-group'>
        <CloudinaryContext cloudName="ddjfwp9wf">
          <Image publicId={this.props.input.value} />
        </CloudinaryContext>
        <input type='file' accept='.jpg, .png, .jpeg' onChange={this.uploadFile.bind(this)} />
      </div>
      {touched &&
        ((error && <div className='alert alert-danger'>{error}</div>))}
    </div>
  )
}

}