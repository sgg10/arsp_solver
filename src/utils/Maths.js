import { simplify, parse, derivative } from 'mathjs';

function* range(start=0, end=null, step=1) {
    if (end == null) {
        end = start;
        start = 0;
    }

    for (let i=start; i < end; i+=step) {
        yield i;
    }
}

class MathFunction {

    constructor(func, symbol){
        this.derivates = {}
        this.function = parse(func.toLowerCase() )
        this.symbol = parse(symbol)
    }

    evaluation(from=-100, to=100, step=0.01){
        let x = [...range(from, to, step)]
        let y = x.map(x_i => this.function.evaluate({x: x_i}))
        return x, y
    }

    get_simplify = () => simplify(this.function).toString()

    get_derivate = () => derivative(this.function, this.symbol, {simplify: true}).toString()
}


export {MathFunction};