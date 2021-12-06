async function onInit() {
    console.log('bla');
    const fs = await fetch('./svgs/eye.svg')
    console.log(fs);
}