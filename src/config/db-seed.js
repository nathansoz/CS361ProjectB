module.exports = function(db) {
    db.Customer.create({
        username: 'test'
    });


  // .success(function(poll) {
  //   db.Choice.bulkCreate([{
  //     id: 1,
  //     name: 'Improved UI',
  //     description: 'New, fancy interface',
  //     PollId: poll.id
  //   }, {
  //     id: 2,
  //     text: 'Improved Performance',
  //     description: 'Faster response times',
  //     PollId: poll.id
  //   }]);
  // });
};
