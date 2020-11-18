<template>
  <div>
    <!--    // TODO ALERTs: En cas d'error i en cas de missatge: Tasca afegida correctament-->
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Tasques</v-toolbar-title>
      </v-toolbar>
      <!--    TODO Toolbar tingui botons accions per: tancar(no mostrar), maximitzar, minimitzar -->
      <v-toolbar>
        <v-form class="d-flex align-baseline">
          <v-text-field>Prova</v-text-field>
          <v-btn class="ml-2" color="primary">Afegir</v-btn>
        </v-form>
      </v-toolbar>
      <v-list>
        <v-list-item>
          <v-list-item-action><v-switch></v-switch></v-list-item-action>
          <v-list-item-title>Tasca1</v-list-item-title>
          <v-list-item-action>
            <v-btn color="success" icon>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-action>
            <v-btn color="error" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-action
            ><v-switch v-model="active"></v-switch
          ></v-list-item-action>
          <v-list-item-title><strike>Tasca 11</strike></v-list-item-title>
          <v-list-item-action>
            <v-btn color="success" icon>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-action>
            <v-btn color="error" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-action
            ><v-switch v-model="active"></v-switch
          ></v-list-item-action>
          <v-list-item-title>
            <v-text-field></v-text-field>
          </v-list-item-title>
          <v-list-item-action>
            <v-btn color="success" icon>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-action>
            <v-btn color="error" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item v-for="task in tasks" :key="task.id">
          <v-list-item-title>
            {{ task.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-toolbar>
        <v-toolbar-title>3 Tasques pendents per fer</v-toolbar-title>
      </v-toolbar>
      <!--    TODO Toolbar tingui botons accions per filtrar: All / Active / Completed -->
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: true,
      tasks: [
        {
          id: 1,
          title: 'Tasca 1',
        },
        {
          id: 2,
          title: 'Tasca 2',
        },
      ],
    }
  },
}
</script>
