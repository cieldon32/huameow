class Points {
  paint(ctx, geom, properties) {
    ctx.width = geom.width;
    ctx.fillStyle = "#F1F3F4";
    for(let x = 0; x < geom.width / 2; x++){
      for(let y = 0; y < geom.height / 2; y++){
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(12 * x, 12 * y);
        ctx.fillRect( 12 * x, 12 * y, 2, 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }

    }

  }
}

registerPaint('Points', Points);
