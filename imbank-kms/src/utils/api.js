import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
  withCredentials: true,
});

export const postLoginInfo = (loginInfo) => api.post('/users/login', loginInfo, { withCredentials: true });
export const getDuplication = (id) => api.get(`/users/check-duplication/${id}`, { withCredentials: true });
export const getLogout = () => api.get('/users/logout', { withCredentials: true });
export const checkLogin = () => api.get('/users/check-login-status', { withCredentials: true });
export const postRegisterInfo = (registerInfo) => api.post('/users/register', registerInfo, { withCredentials: true });

export const getButtonItemList = (buttonId) => api.get(`/button-items/${buttonId}`, { withCredentials: true });
export const putButtonItemList = (buttonId, data) =>
  api.put(`/button-items/${buttonId}`, data, { withCredentials: true });

export const getButtonList = (deptId) => api.get(`/button/list/${deptId}`, { withCredentials: true });
export const postButton = (deptId, data) => api.post(`/button/${deptId}`, data, { withCredentials: true });
export const putButton = (btnId, data) => api.put(`/button/${btnId}`, data, { withCredentials: true });
export const deleteButton = (deptId, buttonId) =>
  api.delete(`/button/${deptId}/${buttonId}`, { withCredentials: true });
export const getMainButton = (deptId) => api.get(`/button/${deptId}`, { withCredentials: true });
export const updateMainButton = (deptId, buttonId) =>
  api.get(`/button/${deptId}/${buttonId}`, { withCredentials: true });

export const getTicketList = (deptId) => api.get(`/ticket/list/${deptId}`, { withCredentials: true });
export const getTicketItemList = (ticketId) => api.get(`/ticket-item/${ticketId}`, { withCredentials: true });
export const postTicketItemList = (ticketId, data) =>
  api.put(`/ticket-item/${ticketId}`, data, { withCredentials: true });
export const getMainTicket = (deptId) => api.get(`/ticket/${deptId}`, { withCredentials: true });
export const updateMainTicket = (deptId, ticketId) =>
  api.get(`/ticket/${deptId}/${ticketId}`, { withCredentials: true });

export const postTicket = (deptId) => api.post(`/ticket/${deptId}`, { withCredentials: true });
export const deleteTicket = (deptId, ticketId) =>
  api.delete(`/ticket/${deptId}/${ticketId}`, { withCredentials: true });
export const putTicket = (ticketId, data) => api.put(`/ticket/${ticketId}`, data, { withCredentials: true });

export const getLayoutList = (deptId) => api.get(`/layout/list/${deptId}`, { withCredentials: true });
export const postLayout = (deptId, data) => api.post(`/layout/${deptId}`, data, { withCredentials: true });
export const deleteLayout = (layoutId) => api.delete(`/layout/${layoutId}`, { withCredentials: true });

export const putLayoutItemList = (layoutId, data) =>
  api.put(`/layout-item/${layoutId}`, data, { withCredentials: true });
export const getLayoutItemList = (layoutId) => api.get(`/layout-item/${layoutId}`, { withCredentials: true });

export const getKioskList = (deptId) => api.get(`/kiosk/list/${deptId}`, { withCredentials: true });
export const postKiosk = (deptId, data) => api.post(`/kiosk/${deptId}`, data, { withCredentials: true });
export const deleteKiosk = (deptId, kioskId) => api.delete(`/kiosk/${deptId}/${kioskId}`, { withCredentials: true });

export const getDepartmentList = () => api.get(`/department/list`, { withCredentials: true });

export const getChart1 = (deptId) => api.get(`/analysis/chart1/${deptId}`, { withCredentials: true });
export const getChart2 = (deptId) => api.get(`/analysis/chart2/${deptId}`, { withCredentials: true });
export const getChart3 = (deptId) => api.get(`/analysis/chart3/${deptId}`, { withCredentials: true });
export const getChart4 = (deptId) => api.get(`/analysis/chart4/${deptId}`, { withCredentials: true });
export const getChart5 = (deptId, range) =>
  api.get(`/analysis/chart5/${deptId}?range=${range}`, { withCredentials: true });
export const getChart8 = (deptId) => api.get(`/analysis/chart8/${deptId}`, { withCredentials: true });
export const getKioskConsultations = (deptId, range) =>
  api.get(`/analysis/chart7/${deptId}?range=${range}`, { withCredentials: true });
