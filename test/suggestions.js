describe('suggestions', () => {
    const client = require('../src-packed/suggestions');

    it('No match', async () => {
        var result = client.getSuggestions("This code is amazing!");
        expect(result.length).to.be.equal(0);
    });

    it('Match at beginning', async () => {
        var result = client.getSuggestions("master this");
        expect(result[0]).to.eql({
            index: 0,
            length: 6,
            replacements: [ { value: "main" }, { value: "primary" } ],
        });
    });

    it('Match at end', async () => {
        var result = client.getSuggestions("Merge this to master");
        expect(result[0]).to.eql({
            index: 14,
            length: 6,
            replacements: [ { value: "main" }, { value: "primary" } ],
        });
    });

    it('Match in the middle', async () => {
        var result = client.getSuggestions("Ship this to the master branch!");
        expect(result[0]).to.eql({
            index: 17,
            length: 6,
            replacements: [ { value: "main" }, { value: "primary" } ],
        });
    });

    it('Retrieve capitalized suggestions for capitalized word', async () => {
        var result = client.getSuggestions("Ship this to the Master branch!");
        expect(result[0]).to.eql({
            index: 17,
            length: 6,
            replacements: [ { value: "Main" }, { value: "Primary" } ],
        });
    });

    it('Retrieve suggestions despite spaces in key', async () => {
        var result = client.getSuggestions("You're crushing it!");
        expect(result[0]).to.eql({
            index: 7,
            length: 11,
            replacements: [ { value: "elevating" }, { value: "exceeding expectations" }, { value: "excelling" } ],
        });
    });

    // This used to match "hang" within "changes"
    it('No match within word', async () => {
        var result = client.getSuggestions("These changes look great!");
        expect(result.length).to.be.equal(0);
    });
});
