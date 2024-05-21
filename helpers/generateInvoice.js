function generate(){
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const randomGenerate = Math.floor(Math.random() * 100000000);
    return `INV/${year}${month}${day}/LTE/${randomGenerate}`;
}

module.exports = {
    generate
};