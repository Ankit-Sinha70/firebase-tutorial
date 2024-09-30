import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../firebase-config";
import { v4 } from "uuid";

function UploadFiles() {
  const [uploadFile, setFileUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  console.log("imageList: ", imageList);
  const imageListRef = ref(storage, "images/");

  const handleUploadFiles = () => {
    if (uploadFile === null) return;
    const imageRef = ref(storage, `images/${uploadFile.name + v4()}`);
    uploadBytes(imageRef, uploadFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((val) => [...val, url]);
        alert("Image Uploaded");
        setFileUpload("");
      });
    });
  };

  const getData = async () => {
    const data = await listAll(imageListRef);
    const urlData = data.items.map(async (item, _) => {
      return await getDownloadURL(item);
    });
    const urlImageData = await Promise.all(urlData);
    setImageList([...urlImageData]);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="upload-container">
        <input
          type="file"
          placeholder="Upload Files..."
          onChange={(e) => setFileUpload(e.target.files[0])}
        />
        <button onClick={handleUploadFiles} className="upload-btn">
          Upload
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {imageList?.map((item, index) => {
          return (
            <div key={index} className="image-card">
              <img
                src={item}
                alt="ImageList"
                style={{
                  width: "200px",
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default UploadFiles;
