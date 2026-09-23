An AI assistant that can approve a refund needs a database that can keep its promises. Before comparing Lakebase, MongoDB or Cosmos DB, ask which records must change together. That answer is more useful than choosing a database because the agent produces JSON.

For related business records with shared rules, start by evaluating Postgres. For data naturally read and changed as a self-contained document, evaluate a document database. Databricks Lakebase adds a specific reason to consider Postgres: operational data alongside an existing Databricks platform.

> Choose the database around the promises your application must keep.

## One refund, two shapes

Imagine a support assistant preparing a £40 refund. This is an illustrative design example, not a measured client result. The customer balance must change, the refund must be recorded and the approval must remain traceable. A retry must not pay twice.

In a relational design, customer, refund and approval records can remain separate, connected by keys and changed in a transaction. A unique business operation ID helps reject a duplicate request. A JSON field can hold the assistant's proposed explanation without making the whole application document-shaped. [Postgres supports both JSON storage and indexing](https://www.postgresql.org/docs/current/datatype-json.html).

In a document design, a bounded support case might keep its messages, proposed resolution and review state together. That fits an interface that repeatedly retrieves the whole case. Once the operation reaches a separately stored customer balance, however, the transaction boundary needs explicit design. The shape of the conversation is not necessarily the shape of the money movement.

## Where Lakebase fits

[Lakebase is managed Postgres integrated with Databricks](https://docs.databricks.com/aws/en/oltp/projects). It serves transactional applications and agent state; it is distinct from using a lakehouse table as an application's operational database. Existing Databricks data and operations make it a relevant candidate, rather than a prerequisite for AI engineering.

If your organisation already depends on Databricks, evaluate the benefit of keeping operational and analytical workflows close. If it does not, compare an ordinary managed Postgres service too. Include regional availability, recovery requirements, authentication, connection behaviour and the workload's actual cost. A platform integration is valuable when it removes work your team really has.

## Where document databases fit

[MongoDB's modelling guidance](https://www.mongodb.com/docs/manual/data-modeling/) starts from access patterns: data read together is often stored together. That can suit varied case records or catalogues whose attributes change. MongoDB also supports [multi-document transactions](https://www.mongodb.com/docs/manual/core/transactions/); “documents cannot transact” would be the wrong comparison.

For Azure Cosmos DB's document model, partitioning is central to the design. Its [transactional batches](https://learn.microsoft.com/en-us/azure/cosmos-db/transactional-batch) group operations sharing a logical partition key. Test whether your business transaction fits that boundary. This discussion concerns that document model, not every database offering carrying the Cosmos name.

Neither document flexibility nor SQL removes the need for tenant isolation, validation, indexing and recovery. Compare the same reads, writes and failure cases before making performance or cost claims.

## Start with the transaction

Draw the refund on one page. Mark every record it changes, where authorisation is checked and what happens after a duplicate request. If a payment provider is involved, a database transaction alone cannot make that external payment atomic: use the provider's idempotency mechanism and a recoverable workflow.

Then test the awkward case: the refund was accepted, but the response never reached the assistant. Can a retry discover the result safely? That experiment teaches more than an abstract SQL-versus-NoSQL scorecard.

Send the decision graphic to the person choosing your agent's data store. If you have a workflow to ship, bring its current database and the operation that must stay consistent. We can discuss a data model your team can operate.

[Discuss your agent data model →](https://ai.hyperdrift.io/?article=lakebase-vs-document-databases#contact)
