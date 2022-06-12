function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
  }
  
export function create1PixelTexture(gl, pixel) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                  new Uint8Array(pixel));
    return texture;
}
  
export function createTexture(gl, url) {
    // Cria um placeholder
    const texture = create1PixelTexture(gl, [128, 192, 255, 255]);

    const image = new Image();
    image.src = url;
    // Assincronamente lê a imagem
    image.addEventListener('load', function() {
      // Faz o bind e joga a textura no ambiente
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
  
      // Checa se as dimensões da textura forem uma potência de dois
      if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
         // Se for, gera os mipmaps da textura
         gl.generateMipmap(gl.TEXTURE_2D);
      } else {
         // Se não, desativa os mipmaps e setta o clamp to edge
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
    });

    return texture;
}