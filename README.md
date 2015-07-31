# BrainTreeConnect #

A wrapper for Meteor style synchronous Braintree API calls.

## Example Usage ##

```javascript

try{
    var bt = BrainTreeConnect({
      //If you set an ENV variable for PRODUCTION you can dynamically change out sandbox and production
      environment: process.env.PRODUCTION && Braintree.Environment.Production || Braintree.Environment.Sandbox,
      merchantId: Meteor.settings.BRAIN_TREE.MERCHANT_ID,
      publicKey:  Meteor.settings.BRAIN_TREE.PUBLIC_KEY,
      privateKey: Meteor.settings.BRAIN_TREE.PRIVATE_KEY
    });
    return bt.customer.create(config);
} catch(error){
    throw new Meteor.Error(1001, error.message);
}
```

## Client API ##
In case you are wanting to use the client API to create the nonce token you should include the following script in your `head.html` file 
~~~
	<script src="https://js.braintreegateway.com/v2/braintree.js"></script>
~~~

## Wrapped API ##

This package wraps the methods below. These are all the methods that are listed in the [braintree-node](https://github.com/braintree/braintree_node) github documentation & the [braintree-website](https://developers.braintreepayments.com/javascript+node/start/hello-server) documentation.

 * address
  * [`create(params)`](https://developers.braintreepayments.com/javascript+node/reference/request/address/create)
  * [`find(customerId, addressId)`](https://developers.braintreepayments.com/javascript+node/reference/request/address/find)
  * [`update(customerId, addressId, params)`](https://developers.braintreepayments.com/javascript+node/reference/request/address/update)
  * [`delete(customerId, addressId)`](https://developers.braintreepayments.com/javascript+node/reference/request/address/delete)
 * clientToken
  * [`generate([customerId])`](https://developers.braintreepayments.com/javascript+node/reference/request/client-token/generate)
 * customer
  * [`create(params)`](https://developers.braintreepayments.com/javascript+node/reference/request/customer/create)
  * [`delete(customerId)`](https://developers.braintreepayments.com/javascript+node/reference/request/customer/delete)
  * [`find(customerId)`](https://developers.braintreepayments.com/javascript+node/reference/request/customer/find)
  * [`search()`](https://developers.braintreepayments.com/javascript+node/reference/request/customer/search)
  * [`update(customerId[, params])`](https://developers.braintreepayments.com/javascript+node/reference/request/customer/update)
 * merchantAccount
  * [`create(params)`](https://developers.braintreepayments.com/javascript+node/reference/request/merchant-account/create)
  * [`find(merchantAccountId)`](https://developers.braintreepayments.com/javascript+node/reference/request/merchant-account/find)
  * [`update(merchantAccountId[, params])`](https://developers.braintreepayments.com/javascript+node/reference/request/merchant-account/update)
 * paymentMethod
  * [`create(params)`](https://developers.braintreepayments.com/javascript+node/reference/request/payment-method/create)
  * [`find(token)`](https://developers.braintreepayments.com/javascript+node/reference/request/payment-method/find)
  * [`update(token[, params])`](https://developers.braintreepayments.com/javascript+node/reference/request/payment-method/update)
  * [`delete(token)`](https://developers.braintreepayments.com/javascript+node/reference/request/payment-method/delete)
 * plan
	 * [`all()`](https://developers.braintreepayments.com/javascript+node/reference/request/plan/all) 
 * Subscriptions
	 * [`cancel(subscriptionId)`](https://developers.braintreepayments.com/javascript+node/reference/request/subscription/cancel)
	 * [`create(params)`](https://developers.braintreepayments.com/javascript+node/reference/request/subscription/create)
	 * [`find(subscriptionId)`](https://developers.braintreepayments.com/javascript+node/reference/request/subscription/find)
	 * [`update(subscriptionId[, params])`](https://developers.braintreepayments.com/javascript+node/reference/request/subscription/update)
	 * [`search()`](https://developers.braintreepayments.com/javascript+node/reference/request/subscription/search)
 * Transaction
	 * [`cancel(transactionId)`](https://developers.braintreepayments.com/javascript+node/reference/request/transaction/cancel-release)
	 * [`cloneTransaction(transactionId)`](https://developers.braintreepayments.com/javascript+node/reference/request/transaction/clone-transaction)
	 * [`find(transactionId)`](https://developers.braintreepayments.com/javascript+node/reference/request/transaction/find)
	 * [`holdInEscrow(transactionId)`](https://developers.braintreepayments.com/javascript+node/reference/request/transaction/hold-in-escrow)
	 * [`refund(transactionId)`](https://developers.braintreepayments.com/javascript+node/reference/request/transaction/refund)
	 * [`releaseFromEscrow(transactionId)`](https://developers.braintreepayments.com/javascript+node/reference/request/transaction/release-from-escrow)
	 * [`sale(config)`](https://developers.braintreepayments.com/javascript+node/reference/request/transaction/sale)
	 * [`search()`](https://developers.braintreepayments.com/javascript+node/reference/request/transaction/search)
	 * [`submitForSettlement(transactionId)`](https://developers.braintreepayments.com/javascript+node/reference/request/transaction/submit-for-settlement)
	 * [`void(transactionId)`](https://developers.braintreepayments.com/javascript+node/reference/request/transaction/void)

##Webhooks (Example) ##

This example uses Iron Router but you can you any server side routing package

    Router.route('receiveMerchantUpdate', function () {
    
          // NodeJS request object
          var request = this.request;
    
          // NodeJS  response object
          var response = this.response;
    
          var bt_challenge = request.query.bt_challenge;
    
          var bt = BrainTreeConnect({
            environment: process.env.PRODUCTION && Braintree.Environment.Production || Braintree.Environment.Sandbox,
            merchantId: Meteor.settings.BRAIN_TREE.MERCHANT_ID,
            publicKey: Meteor.settings.BRAIN_TREE.PUBLIC_KEY,
            privateKey: Meteor.settings.BRAIN_TREE.PRIVATE_KEY
          });
  
          //If we are verifying the webhook
          if(bt_challenge) {
            return response.end(bt.webhookNotification.verify(bt_challenge));
          } else {
          
    //Decode the request and perform the needed logic for the type of request
     bt.webhookNotification.parse(request.body.bt_signature, request.body.bt_payload, function (err, webhookNotifiction) {
              switch(webhookNotifiction.kind) {
    
                //Sub Merchant was Approved
                case Braintree.WebhookNotification.Kind.SubMerchantAccountApproved:
    
                  //Find and Update the user
                  Meteor.users.update({ 'profile.merchantAccount.id' :  webhookNotifiction.merchantAccount.id }, { $set : {
                    'profile.merchantAccount' : webhookNotifiction.merchantAccount
                  }});
    
                  console.log('Success');
                  break;
    
                //Supplier was declined
                case Braintree.WebhookNotification.Kind.SubMerchantAccountDeclined:
                  console.log('Failed');
                  break;
              }
    
            });
    
            return response.end();
          }
        },
        {
          where: 'server',
          path: 'hooks/processor/merchants'
        });
