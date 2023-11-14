// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
enum TestEnum {
    LABEL = 'value',
    LABEL2 = 'value2'
}
const myTest = () => {

    Object.entries(TestEnum).map( i => console.log(i))


}

myTest()
