For the refund in this article, **start with Postgres**. For a new application built around independent support cases, **start by evaluating a document database**. The useful comparison is between two kinds of work, not between an AI-friendly database and an old-fashioned one.

“Lakebase versus document databases” mixes a managed service with a data model. Choose the model around the business operation, then choose a service. Lakebase is a managed Postgres option when Databricks is already part of the stack.

> Related money records point to Postgres. Independent, evolving cases point to documents.

## One refund, two shapes

Imagine a support assistant preparing a £40 refund. This is an illustrative design example, not a measured client result. The customer balance must change, the refund must be recorded and the approval must remain traceable. A retry must not pay twice.

In a relational design, customer, refund and approval records can remain separate, connected by keys and changed in [one Postgres transaction](https://www.postgresql.org/docs/current/tutorial-transactions.html). A unique business operation ID helps reject a duplicate request. A JSON field can hold the assistant's proposed explanation without making the whole application document-shaped. [Postgres supports both JSON storage and indexing](https://www.postgresql.org/docs/current/datatype-json.html). That keeps the money-moving state behind one consistency boundary.

In a document design, a bounded support case might keep its messages, proposed resolution and review state together. That fits an interface that repeatedly retrieves the whole case. Once the operation reaches a separately stored customer balance, however, the transaction boundary needs explicit design. The shape of the conversation is not necessarily the shape of the money movement. A case document can still be useful beside a relational refund ledger.

## Where Lakebase fits

[Lakebase is managed Postgres integrated with Databricks](https://docs.databricks.com/aws/en/oltp/projects/databricks-apps). It is one way to implement the recommended relational model, not a different data model from Postgres. Existing Databricks data and operations make it a relevant candidate, rather than a prerequisite for AI engineering.

If your organisation already depends on Databricks, evaluate the benefit of keeping operational and analytical workflows close. If it does not, compare an ordinary managed Postgres service too. Include regional availability, recovery requirements, authentication, connection behaviour and the workload's actual cost. A platform integration is valuable when it removes work your team really has.

## A support case where documents fit better

Now imagine a support assistant that drafts and tracks product issues, but never moves money. Each case holds messages, screenshot links, device details, tags and a generated summary. Fields vary by product; the interface usually reads and updates one complete case. No shared balance or ledger changes. Here, I would start with a document database: the case itself is the natural write boundary, and storing its varied fields together keeps that workflow simple. An existing Postgres service can also store JSON, so this is not a reason to add a second database by default. If the assistant later issues a refund, send that command to a transaction-backed refund service.

[MongoDB's modelling guidance](https://www.mongodb.com/docs/manual/data-modeling/) starts from access patterns: data read together is often stored together. MongoDB also supports [multi-document transactions](https://www.mongodb.com/docs/manual/core/transactions/); “documents cannot transact” would be the wrong comparison. If your refund system already uses MongoDB, prove the balance and refund update atomically before considering a migration.

For Azure Cosmos DB's document model, partitioning is central to the design. Its [transactional batches](https://learn.microsoft.com/en-us/azure/cosmos-db/transactional-batch) group operations sharing a logical partition key. If balance and refund span partition keys, that batch does not cover both; design another consistency mechanism or choose a different model. This discussion concerns that document model, not every database offering carrying the Cosmos name.

Neither model removes the need for tenant isolation, validation, indexing and recovery. Compare the same reads, writes and failure cases before making performance or cost claims.

## Which one should you choose?

**Choose Postgres for the illustrated refund.** Balance, refund, approval and operation identity have shared rules and should commit together. Lakebase is one managed Postgres choice if Databricks integration is useful; otherwise compare ordinary managed Postgres.

**Choose a document database for the case-first application.** Its varied fields are usually read and changed as one unit, with no cross-record money invariant.

**Keep external payments separate from either database transaction.** Use the provider's idempotency mechanism and a recoverable workflow.

Test the awkward refund case: the provider accepted it, but the response never reached the assistant. Can a retry discover the result safely? The [streaming and recovery guide](/articles/langchain-databricks-appkit-sse) follows that failure through a disconnected browser.

Send the decision graphic to the person choosing your agent's data store. If you have a workflow to ship, bring its current database and the operation that must stay consistent. We can discuss a data model your team can operate.

[Discuss your agent data model →](https://ai.hyperdrift.io/?article=lakebase-vs-document-databases#contact)
