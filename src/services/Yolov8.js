import axios from 'axios';

const apiUrl = "http://127.0.0.1:6868/"

class Yolov8 {
    predict(imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);

        return axios.post(apiUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    ExtractVector(data){
        return axios.post(apiUrl+"/extract_vector",data)
    }
    imageRetrieval(id_detect){
        return axios.get(apiUrl+`/image_retrieval?path=${id_detect}`)
    }
}

export default new Yolov8();
