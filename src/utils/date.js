function formatDate(inputDate) {
    // Tạo đối tượng Date từ chuỗi ngày tháng
    const date = new Date(inputDate);
    
    // Lấy năm, tháng và ngày
    let year = date.getFullYear().toString().slice(-2); // Lấy 2 chữ số cuối của năm
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và thêm số 0 nếu cần
    let day = date.getDate().toString().padStart(2, '0'); // Lấy ngày và thêm số 0 nếu cần
    
    // Ghép các phần lại thành chuỗi định dạng yy-mm-dd
    return `${year}-${month}-${day}`;
  }
  
module.exports = { formatDate};