class Platform {
    constructor(platform = [[]], x = 0, y = 0, dimension = boxDimension, color = {r : 255, g : 255, b : 255}) {
        this.platform = platform
        this.dimension = dimension
        this.color = color
        this.x = x
        this.y = y
        this.generatePlatform()
    }

    show() {
        this.platform.forEach( (row, i) => row.forEach( (box, j) => box === null ? this.showEmptyBox() : box.show()))
    }

    generatePlatform() {
        let platformLength = canvasWidth / this.dimension
        let platformHeight = canvasHeight / this.dimension
        this.platform = Array.from(new Array(platformHeight), row =>
                        Array.from(new Array(platformLength), col => null))
    }

    showEmptyBox() {
        let {r , g , b} = this.color
        stroke(r, g, b)
        fill(backgroundColor)
    }

    placePiece(piece) {
        piece.shape.reduce(
           (z, x) => z.concat(x.filter(col => col != null)), []
         ).
        forEach(
           box => this.platform[box.y / boxDimension][box.x / boxDimension] = box
         )

        //let nn = piece.shape.filter(col => col != null)
        //nn.forEach( box => this.platform[box.y / boxDimension][box.x / boxDimension] = box)
    }

    piecesColliding(piece, collision = (rect1, rect2) => rectCollision(rect1, rect2), applyToBoxes = box => box) {
        let boxes = piece.shape.reduce( (z, x) => z.concat(x.filter(col => col != null)), [])
        boxes.forEach(box => applyToBoxes(box))
        let piecesInPlatform = this.platform.reduce( (z, x) => z.concat(x.filter(col => col != null)), [])
        return boxes.reduce( (z, box) => piecesInPlatform.filter( p => collision(box, p)).length > 0 ? true : z , false)
    }

    sweep() {
          let rowCount = 1;
          for (let y = 0; y < this.platform.length; y++) {
              let full = true;
              for (let x = 0; x < this.platform[y].length; x++) {
                  if (this.platform[y][x] == null) {
                      full = false;
                      break;
                  }
              }
              if (full) {
                console.log(this.platform)
                console.log(y)
                this.platform.splice(y, 1);
                this.platform.unshift(new Array(canvasWidth / this.dimension).fill(null));
                console.log(this.platform)
            }
              //
              // player.score += 10 * rowCount;
              // rowCount *= 2;
          }
          this.show()

        // let preBoxesCount = this.countBoxes()//Row = value [second array], i = index
        // for (let a = 0; a < this.platform.length; a++) {
        //   let row = this.platform[a]
        //   if (row.every(box => box != null)) {
        //     //Delete row
        //     //Increment score
        //     //Shift all above rows down one
        //   }
        // }
        // this.platform.forEach( (row, i) => {
        //   if(row.every( box => box != null)/*If the row if full*/)
        //   {
        //     this.platform.splice(i)
        //     this.platform.unshift(new Array(canvasWidth / this.dimension).fill(null))
        //     // row.forEach( (element, j) =>  this.platform[i][j] = null);/*Delete every box */

            //18 => 19
            // console.log(i);
            // for (let rr = i; rr > 0; rr--) {
            //   console.log(rr)
            //   console.log(this.platform[rr])
            //   console.log(this.platform[rr-1])
            //   this.platform[rr] = this.platform[rr-1]
            //   // console.log(this.platform[rr])
            //   console.log(this.platform[rr-1])
            // }
        // }
      // )

        // let postBoxesCount = this.countBoxes()
        // preBoxesCount != postBoxesCount ? points += preBoxesCount - postBoxesCount : points = points
        //TODO: Implement Score Guides

    }

    countBoxes() {
        return this.platform.reduce( (z, row) => z += row.filter( element => element != null).length, 0)
    }
}
