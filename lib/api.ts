export const API_BASE_URL = 'http://localhost:8000';

export async function processVehicle(file: File, state: 'enter' | 'exit') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('state', state);

  const response = await fetch(`${API_BASE_URL}/process/`, {
    method: 'POST',
    body: formData,
  });
  return response.json();
}

export async function registerVehiclesFromImages(files: FileList) {
  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append('files', file);
  });

  const response = await fetch(`${API_BASE_URL}/register-from-images/`, {
    method: 'POST',
    body: formData,
  });
  return response.json();
}

export async function registerVehiclesFromFolder() {
  const response = await fetch(`${API_BASE_URL}/register-from-folder/`, {
    method: 'POST',
  });
  return response.json();
}

export async function fetchRegisteredVehicles() {
  const response = await fetch(`${API_BASE_URL}/registered-vehicles/`);
  return response.json();
}

export async function fetchVehicleLogs() {
  const response = await fetch(`${API_BASE_URL}/vehicles_log/`);
  return response.json();
}

export async function deleteVehicle(id: number) {
  const response = await fetch(`${API_BASE_URL}/registered-vehicles/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}