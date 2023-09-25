import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDigilocker } from '../context';

const DocumentsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const digilockerInstance: any = useDigilocker();
  const [issuedDocuments, setIssuedDocuments] = useState([]);
  const code = queryParams.get('code');

  useEffect(() => {
    if (code) {
      // Exchange the code for an access token
      digilockerInstance
        .exchangeCodeForToken(code)
        .then(() => {
          console.log('Access Token:', digilockerInstance.accessToken);
          // Fetch issued documents once the access token is available
          fetchIssuedDocuments();
        })
        .catch((error: any) => {
          console.error('Error exchanging code for token:', error);
        });
    }
  }, [code, digilockerInstance]);

  const fetchIssuedDocuments = () => {
    // Fetch issued documents using the access token
    digilockerInstance
      .fetchIssuedFiles()
      .then((issuedFiles: any) => {
        setIssuedDocuments(issuedFiles);
      })
      .catch((error: any) => {
        console.error('Error fetching issued documents:', error);
      });
  };

  return (
    <div>
      <h1>Documents Page</h1>
      <ul>
        {issuedDocuments.map((document: any) => (
          <li key={document.id}>
            <p>Name: {document.name}</p>
            <p>Description: {document.description}</p>
            {/* Display other document information as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentsPage;
