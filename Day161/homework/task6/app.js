// buffer - ით შექმენით 5 ადგილიანი მეხსიერება, მეორე არგუმენტად კი გადეცით ascii - ის ცხრილიდან რომელიმე რიცხვი და დაბეჭდეთ საბოლოო შედეგი

const userAlloc = Buffer.alloc(5,97);

console.log(userAlloc.toString())