# BrainTreeConnect #

A wrapper for Meteor style synchronous Braintree API calls.

## Example Usage ##

```javascript
BrainTreeConnect = BrainTreeConnect(key);

try{
    var BrainTreeConnect = BrainTreeConnect({
      environment: Braintree.Environment.Sandbox,
      merchantId: Meteor.settings.BRAIN_TREE.MERCHANT_ID,
      publicKey:  Meteor.settings.BRAIN_TREE.PUBLIC_KEY,
      privateKey: Meteor.settings.BRAIN_TREE.PRIVATE_KEY
    });
    return BrainTreeConnect.customer.create(config);
} catch(error){
    throw new Meteor.Error(1001, error.message);
}
```

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