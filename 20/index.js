const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.trimEnd().split(/\n/gi);

class LinkedList {
  constructor(values) {
    let item = { value: values.shift() };
    item.next = item;
    item.previous = item;

    this.items = [item];
    this.tail = item;

    values.forEach((val) => this.push(val));
  }

  push(value) {
    let item = {
      value,
      previous: this.tail,
      next: this.tail.next,
    };

    // set head's previous
    this.tail.next.previous = item;
    // set tail's next
    this.tail.next = item;
    // set tail
    this.tail = item;

    this.items.push(item);

    return this.tail;
  }

  moveToNext(item, iterations = 1) {
    const moves = Math.abs(iterations) % (this.items.length - 1)
    for (let i = 0; i < moves; i += 1) {
      let tmp = item.next;

      item.next = tmp.next;
      tmp.previous = item.previous;

      tmp.next.previous = item;
      tmp.next = item;

      item.previous.next = tmp;
      item.previous = tmp;
    }
  }

  moveToPrevious(item, iterations = 1) {
    const moves = Math.abs(iterations) % (this.items.length - 1)
    for (let i = 0; i < moves; i += 1) {
      let tmp = item.previous;

      item.previous = tmp.previous;
      tmp.next = item.next;

      tmp.previous.next = item;
      tmp.previous = item;

      item.next.previous = tmp;
      item.next = tmp;
    }
  }

  mix() {
    this.items.forEach((item) => {
      const { value } = item;
      if (value > 0) {
        this.moveToNext(item, value);
      } else {
        this.moveToPrevious(item, Math.abs(value));
      }
      this.print();
    });
  }

  getCoordinates() {
    let tmp = this.items.find((i) => i.value === 0);
    let result = 0;

    for (let i = 1; i <= 3000; i += 1) {
      tmp = tmp.next
      if (i % 1000 === 0) {
        result += tmp.value;
      }
    }
    return result;
  }

  print() {
    let tmp = this.tail;
    const printable = [];
    for (let i = 0; i < this.items.length; i += 1) {
      printable.push(tmp.value);
      tmp = tmp.previous;
    }
    // console.log(printable.reverse().join());
  }
}


// part 1
{
  const values = lines.map(Number);
  const list = new LinkedList([...values]);
  list.print();
  list.mix();
  console.log(list.getCoordinates());
}

// part 2
{
  const values = lines.map((line) => Number(line) * 811589153);
  const list = new LinkedList([...values]);
  list.print();
  for (let i = 0; i < 10; i += 1) {
    list.mix();
  }
  console.log(list.getCoordinates());
}
