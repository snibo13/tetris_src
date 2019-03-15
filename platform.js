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
        let platformLength = canvasWidth / this.dimension;
        let platformHeight = canvasHeight / this.dimension;
        this.platform = Array.from(new Array(platformHeight), row =>
                        Array.from(new Array(platformLength), col => null))
    }

    showEmptyBox() {
        let {r , g , b} = this.color;
        stroke(r, g, b);
        fill(backgroundColor);
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
    }

    piecesColliding(piece, collision = (rect1, rect2) => rectCollision(rect1, rect2), applyToBoxes = box => box) {
        let boxes = piece.shape.reduce( (z, x) => z.concat(x.filter(col => col != null)), [])
        boxes.forEach(box => applyToBoxes(box))
        let piecesInPlatform = this.platform.reduce( (z, x) => z.concat(x.filter(col => col != null)), [])
        return boxes.reduce( (z, box) => piecesInPlatform.filter( p => collision(box, p)).length > 0 ? true : z , false)
    }

    sweep() {
        var rowCount = 0;
        
        this.platform.filter ( row => row.forEach( (col, x) => {col != null; rowCount++}  ));
        var b = false;
        console.log(rowCount)
        var rowLen = this.platform.length;
        var columnLen = this.platform.length[0];
        for ( let r = rowLen; r > 0 ; r--) {
            var row = this.platform[r];
            if (row.forEach ( (col, x) => col != null ? true: false)) {
                if (this.platform[r++].forEach( (col,x) => col != null ? true: false)){
                    this.platform[r] = this.platform[r++];
                    r--;
                }
            } 
        }
        //TODO: Implement Score Guides

    }

    countBoxes() {
        return this.platform.reduce( (z, row) => z += row.filter( element => element != null).length, 0)
    }
}

    }

    countBoxes() {
        return this.platform.reduce( (z, row) => z += row.filter( element => element != null).length, 0)
    }
}
