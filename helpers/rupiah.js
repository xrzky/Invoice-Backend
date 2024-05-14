const convert = (number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(number);
}

const unconvert = (value) => {
    value = value.replace("Rp","")
    value = value.replace(".","")
    value = value.replace(",","")
    return(Number(value))
}

module.exports = {
    convert, unconvert
}