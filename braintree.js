Braintree = Npm.require('braintree');

BrainTreeConnect = function (key) {
  var BraintreeObj;
  var resources = {
    address : ['create', 'delete', 'find', 'update'],
    clientToken : ['generate'],
    customer : ['create', 'delete', 'find', 'search', 'update'],
    merchantAccount : ['create', 'find', 'update'],
    paymentMethod : ['create', 'delete', 'find', 'update'],
    plan : ['all'],
    subscription : ['cancel', 'create', 'find', 'search', 'update'],
    transaction : ['cancelRelease', 'cloneTransaction', 'find', 'holdInEscrow', 'refund', 'releaseFromEscrow', 'sale', 'search', 'submitForSettlement', 'void']
  };

  BraintreeObj = new Braintree.connect(key);

  _.each(resources, function (resource, key){
    _.each(resource, function (funcName){
      var func = BraintreeObj[key][funcName];
      BraintreeObj[key][funcName] = Meteor.wrapAsync(func, BraintreeObj[key]);
    });
  });

  return BraintreeObj;
};
