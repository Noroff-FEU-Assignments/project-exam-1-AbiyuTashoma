function getImageSource (aPost) {
    const splitContainer = aPost.split('src=');
    let imageSource = [];
    for (let k = 1; k < splitContainer.length; k++) {
        let temp = truncate (splitContainer[k], 0, splitContainer[k].indexOf(' alt'))
        imageSource.push(temp);
    }

    return imageSource;
}