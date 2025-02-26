"""Added contact_email to Charity model

Revision ID: 1f6565d233b8
Revises: fb34d70e3cda
Create Date: 2025-02-27 02:05:47.900739

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1f6565d233b8'
down_revision = 'fb34d70e3cda'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('charities', schema=None) as batch_op:
        batch_op.add_column(sa.Column('contact_email', sa.String(length=120), nullable=False))
        batch_op.create_unique_constraint(None, ['contact_email'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('charities', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('contact_email')

    # ### end Alembic commands ###
